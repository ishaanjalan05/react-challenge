import { useAuthState, useDataQuery } from "./firebase";

export function useIsAdmin() {
  const { user, isInitialLoading } = useAuthState();
  const uid = user?.uid ?? "guest";

  // value at /admins/{uid} will be true (admin) or null/undefined (not admin)
  const [flag, loading, error] = useDataQuery<boolean>(`/admins/${uid}`);

  return {
    isAdmin: !!flag,
    loading: isInitialLoading || loading,
    error,
    uid: user?.uid ?? null,
  };
}
