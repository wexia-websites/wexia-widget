export interface WexiaWidgetConfig {
  apiUrl: string
  apiKey: string
  sourceApp: string
  position?: 'bottom-right' | 'bottom-left'
  primaryColor?: string
  categories?: string[]
  userEmail?: string
  userName?: string
}

export interface FeedbackPayload {
  source_app: string
  category: string
  comment: string
  screenshot_url?: string
  screenshot_base64?: string
  url: string
  user_agent: string
  user_email?: string
  user_name?: string
  element_selector?: string
  timestamp: string
}
