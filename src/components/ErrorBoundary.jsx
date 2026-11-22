import { Component } from 'react';

// Guarantees a visible fallback instead of a blank page if any component throws.
export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.error('Invitation render error:', error); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="error-fallback" role="alert">
        <h1>Aarav &amp; Meera</h1>
        <p>Something went wrong while showing the invitation.</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }
}
