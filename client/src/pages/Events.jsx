import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { getEvents } from "../services/api";

const CATEGORIES = ["All", "Tech", "Design", "Career"];

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");

    useEffect(() => {
        async function loadEvents() {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (err) {
                setError(err.message || "Unable to load events");
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    const visibleEvents = events.filter((event) => {
        const matchesCategory = category === "All" || event.category === category;
        const matchesSearch = event.title
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-16">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events by title..."
                className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none md:w-80"
            />

            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${category === cat
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="mx-auto max-w-7xl">
                <h1 className="text-4xl font-bold text-slate-900">Upcoming Events</h1>

                <p className="mt-2 text-slate-600">
                    Explore our upcoming events and register for the ones you like.
                </p>

                {loading && <Loading />}

                {!loading && error && (
                    <p className="mt-6 text-red-600">{error}</p>
                )}

                {!loading && !error && events.length === 0 && (
                    <p className="mt-6 text-slate-600">No events are available.</p>
                )}

                {!loading && !error && events.length > 0 && visibleEvents.length === 0 && (
                    <p className="mt-10 text-center text-slate-500">
                        No events match "{searchTerm}" in {category}.
                    </p>
                )}

                {!loading && !error && visibleEvents.length > 0 && (
                    <>
                        <p className="mt-6 text-sm text-slate-500">
                            Showing {visibleEvents.length} of {events.length} events
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
                            {visibleEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    title={event.title}
                                    description={event.description}
                                    date={event.date}
                                    time={event.time}
                                    location={event.location}
                                    category={event.category}
                                    status={event.status}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Events;