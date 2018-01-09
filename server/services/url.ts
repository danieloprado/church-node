let _hostname: string = null;

export function setHostName(hostname: string): void {
  _hostname = hostname;
}

export function home(): string {
  return _hostname;
}

export function content(content: string): string {
  return `${_hostname}/api/content/${content}`;
}

export function resetPassword(token: string): string {
  return `${_hostname}/nova-senha?t=${token}`;
}

export function facebookCallback(): string {
  return `${_hostname}/api/web/auth/facebook/callback`;
}

export function googleCallback(): string {
  return `${_hostname}/api/web/auth/google/callback`;
}

export function loginMessage(message: string): string {
  return `${_hostname}/social-callback?m=${message}`;
}

export function loginSocial(token: string): string {
  return `${_hostname}/social-callback?t=${token}`;
}