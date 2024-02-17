// ErrorBoundary.tsx
"use client"
import React, { Component, ErrorInfo } from 'react';


interface ErrorBoundaryState {
    hasError: boolean;
}

const ErrorPage = () => {
    return (
        <div className='text-light-2'> this is error page </div>
    )
}

class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error('Error Boundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        // You can implement your logic to reset the error state here
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            // You can customize the message passed to ErrorPage as needed
            return <ErrorPage />
        }

        return this.props.children;
    }
}

export default ErrorBoundary;