import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  message?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, message } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return <span>{message ?? 'Load Failed'}</span>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
