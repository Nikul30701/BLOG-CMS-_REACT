import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 border border-slate-700">
            <span className="text-xl font-semibold text-slate-200">404</span>
        </div>
        <h1 className="text-2xl font-semibold text-white mb-1">
            Page not found
        </h1>
        <p className="text-sm text-slate-400 mb-4">
            The page you are looking for does not exist or has been moved.
        </p>
        <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
            Go back home
        </Link>
        </div>
    );
}

export default NotFound;
