import useRegistrations from "../hooks/useRegistrations";

function EventCard({ id, title, description, date, location, category, status }) {
    const { isRegistered, register } = useRegistrations();

    return (
        <div className="flex flex-col rounded-xl border bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <span className="w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                {category}
            </span>

            <h3 className="mt-3 text-lg font-bold text-slate-900 md:text-2xl">{title}</h3>
            <p className="mt-2 text-slate-600">{description}</p>
            <p className="mt-2 text-sm text-slate-500">📅 {date}</p>
            <p className="mt-1 text-sm text-slate-500">📍 {location}</p>

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-400">
                    {status === "open" ? "Free Entry" : "Registrations closed"}
                </span>

                {isRegistered(id) ? (
                    <span className="font-semibold text-green-600">✓ Registered</span>
                ) : status === "open" ? (
                    <button
                        onClick={() => register(id)}
                        className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 md:w-auto"
                    >
                        Register
                    </button>
                ) : (
                    <button disabled className="cursor-not-allowed rounded-lg bg-slate-300 px-4 py-2 text-white">
                        Closed
                    </button>
                )}
            </div>
        </div>
    );
}

export default EventCard;