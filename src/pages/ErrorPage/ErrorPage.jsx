import { useLocation, useNavigate } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const errorType = location.state?.errorType || '404';

    const config = {
        '404': {
            emoji: '🔍',
            title: 'Link Not Found',
            message: "The short link you're looking for doesn't exist. It may have been removed or the URL is incorrect.",
            primaryColor: '#ef4444',
            darkColor: '#dc2626'
        },
        '410': {
            emoji: '⏰',
            title: 'Link Expired',
            message: 'This short link has expired and is no longer active. The owner set a time limit on this link.',
            primaryColor: '#f59e0b',
            darkColor: '#d97706'
        }
    };

    const currentConfig = config[errorType] || config['404'];

    return (
        <div className="error-body" style={{
            '--primary-color': currentConfig.primaryColor,
            '--dark-color': currentConfig.darkColor
        }}>
            <div className="bg-glow bg-glow-1"></div>
            <div className="bg-glow bg-glow-2"></div>

            <div className="error-container">
                <div className="icon-wrapper">{currentConfig.emoji}</div>
                <p className="status-code">Error {errorType}</p>
                <h1>{currentConfig.title}</h1>
                <p className="message">{currentConfig.message}</p>

                <div className="actions">
                    <button onClick={() => navigate('/')} className="btn btn-primary">
                        ✨ Shorten a New Link
                    </button>
                    <button onClick={() => navigate(-1)} className="btn btn-secondary">
                        ← Go Back
                    </button>
                </div>

                <p className="footer">
                    Powered by <a href="/">URL Shortener</a> · Built with ❤️
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
