import { useEffect, useState } from 'react'
import './App.css'

const STREAMERS_API_URL = 'https://api.chess.com/pub/streamers'
const STREAMERS_PER_PAGE = 12

type Streamer = {
  username: string
  avatar: string
  twitch_url?: string
  is_live: boolean
  platforms?: {
    type: string
    channel_url?: string
    stream_url?: string
  }[]
}

type StreamersStatus = 'loading' | 'success' | 'error'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStreamer(value: unknown): value is Streamer {
  if (!isObject(value)) {
    return false
  }

  return (
    typeof value.username === 'string' &&
    typeof value.avatar === 'string' &&
    typeof value.is_live === 'boolean' &&
    (value.twitch_url === undefined ||
      typeof value.twitch_url === 'string') &&
    (value.platforms === undefined ||
      (Array.isArray(value.platforms) &&
        value.platforms.every(
          (platform) =>
            isObject(platform) &&
            typeof platform.type === 'string' &&
            (platform.channel_url === undefined ||
              typeof platform.channel_url === 'string') &&
            (platform.stream_url === undefined ||
              typeof platform.stream_url === 'string'),
        )))
  )
}

function isStreamersResponse(value: unknown): value is { streamers: Streamer[] } {
  return (
    isObject(value) &&
    Array.isArray(value.streamers) &&
    value.streamers.every(isStreamer)
  )
}

function getTwitchUrl(streamer: Streamer): string | undefined {
  const twitchUrl = streamer.twitch_url?.trim()

  if (twitchUrl) {
    return twitchUrl
  }

  const twitchPlatform = streamer.platforms?.find(
    (platform) => platform.type === 'twitch',
  )

  return twitchPlatform?.channel_url?.trim() || twitchPlatform?.stream_url?.trim()
}

function App() {
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [status, setStatus] = useState<StreamersStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const pageCount = Math.ceil(streamers.length / STREAMERS_PER_PAGE)
  const pageStart = (currentPage - 1) * STREAMERS_PER_PAGE
  const visibleStreamers = streamers.slice(
    pageStart,
    pageStart + STREAMERS_PER_PAGE,
  )

  useEffect(() => {
    const controller = new AbortController()

    async function loadStreamers() {
      try {
        const response = await fetch(STREAMERS_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(
            `Não foi possível carregar os streamers (HTTP ${response.status}).`,
          )
        }

        const payload: unknown = await response.json()

        if (!isStreamersResponse(payload)) {
          throw new Error('A resposta da API está em um formato inesperado.')
        }

        setStreamers(payload.streamers)
        setStatus('success')
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro inesperado ao carregar os streamers.',
        )
        setStatus('error')
      }
    }

    void loadStreamers()

    return () => controller.abort()
  }, [])

  return (
    <div className="page">
      <header className="site-header">
        <div className="page-container">
          <p className="site-header__eyebrow">Chess Streamers</p>
          <h1>Encontre seu próximo streamer de xadrez</h1>
          <p className="site-header__description">
            Acompanhe quem está ao vivo e acesse os canais da comunidade de
            xadrez.
          </p>
        </div>
      </header>

      <main className="page-container page-content">
        <section className="streamers-section" aria-labelledby="streamers-title">
          <div className="streamers-section__heading">
            <h2 id="streamers-title">Streamers</h2>
            {status === 'success' && (
              <p>
                {streamers.length}{' '}
                {streamers.length === 1
                  ? 'streamer encontrado'
                  : 'streamers encontrados'}
              </p>
            )}
          </div>
          {status === 'loading' && (
            <div className="streamers-placeholder" role="status">
              Carregando streamers...
            </div>
          )}
          {status === 'error' && (
            <div
              className="streamers-placeholder streamers-placeholder--error"
              role="alert"
            >
              {errorMessage}
            </div>
          )}
          {status === 'success' && streamers.length === 0 && (
            <div className="streamers-placeholder" role="status">
              Nenhum streamer disponível no momento.
            </div>
          )}
          {status === 'success' && streamers.length > 0 && (
            <>
              <ul className="streamer-list">
                {visibleStreamers.map((streamer) => {
                  const twitchUrl = getTwitchUrl(streamer)

                  return (
                    <li className="streamer-card" key={streamer.username}>
                      <div className="streamer-card__details">
                        <h3 className="streamer-card__username">
                          {streamer.username}
                        </h3>
                        <p
                          className={`streamer-card__status ${
                            streamer.is_live
                              ? 'streamer-card__status--online'
                              : 'streamer-card__status--offline'
                          }`}
                        >
                          <span aria-hidden="true" />
                          {streamer.is_live ? 'Online' : 'Offline'}
                        </p>
                        {twitchUrl ? (
                          <a
                            className="streamer-card__link"
                            href={twitchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Acessar Twitch
                          </a>
                        ) : (
                          <p className="streamer-card__unavailable">
                            Canal da Twitch não disponível.
                          </p>
                        )}
                      </div>
                      <img
                        className="streamer-card__avatar"
                        src={streamer.avatar}
                        alt={`Avatar de ${streamer.username}`}
                        loading="lazy"
                      />
                    </li>
                  )
                })}
              </ul>
              {streamers.length > STREAMERS_PER_PAGE && (
                <nav
                  className="pagination"
                  aria-label="Paginação dos streamers"
                >
                  <button
                    className="pagination__button"
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <p className="pagination__current" aria-live="polite">
                    Página {currentPage} de {pageCount}
                  </p>
                  <button
                    className="pagination__button"
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(pageCount, page + 1))
                    }
                    disabled={currentPage === pageCount}
                  >
                    Próxima
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
