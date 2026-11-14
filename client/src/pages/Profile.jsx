import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getUserProfile } from "../services/api";
import Loading from "../components/Loading";

function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadProfile() {
            try {
                const data = await getUserProfile(user.id);
                if (active) setProfile(data.user);
            } catch (err) {
                if (active) setError(err.message || "Unable to load profile");
            } finally {
                if (active) setLoading(false);
            }
        }

        loadProfile();

        return () => {
            active = false;
        };
    }, [user.id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-slate-100 px-6 py-16">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
                <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>

                {error && <p className="mt-4 text-red-600">{error}</p>}

                {profile && (
                    <dl className="mt-6 space-y-4">
                        <div>
                            <dt className="text-sm text-slate-500">Name</dt>
                            <dd className="font-medium text-slate-900">{profile.name}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-slate-500">Email</dt>
                            <dd className="font-medium text-slate-900">{profile.email}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-slate-500">Role</dt>
                            <dd className="font-medium text-slate-900">{profile.role}</dd>
                        </div>
                    </dl>
                )}
            </div>
        </div>
    );
}

export default Profile;