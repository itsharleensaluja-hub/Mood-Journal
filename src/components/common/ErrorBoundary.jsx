import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-screen" role="alert">
          <div className="w-12 h-12 rounded-xl bg-clay-100 dark:bg-clay-900/30 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-clay-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-base font-serif font-semibold text-ink-900 dark:text-ink-100 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-ink-400 dark:text-ink-500 mb-4 max-w-md">
            {this.props.message || 'An unexpected error occurred. Please try refreshing the page.'}
          </p>
          {this.state.errorInfo && (
            <details className="max-w-2xl w-full text-left mb-4">
              <summary className="cursor-pointer text-xs text-ink-400 dark:text-ink-500 hover:text-ink-600 font-mono">
                Component stack
              </summary>
              <pre className="mt-2 p-3 rounded bg-ink-50 dark:bg-ink-900 text-[10px] text-ink-600 dark:text-ink-400 overflow-auto max-h-60 font-mono whitespace-pre-wrap">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <pre className="max-w-2xl w-full text-left mb-4 p-3 rounded bg-ink-50 dark:bg-ink-900 text-[10px] text-clay-600 dark:text-clay-400 overflow-auto max-h-40 font-mono whitespace-pre-wrap">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-plum-500 hover:bg-plum-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
