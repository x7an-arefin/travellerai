export interface ServiceHealth {
  name: string
  icon: string
  uptime: string
  latencyMs?: number
  status: 'healthy' | 'degraded' | 'down'
  bars: number[]
}

export interface SystemHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  app: string
  checks?: Record<string, { status: string; latencyMs?: number; error?: string }>
}
