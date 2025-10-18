import { useAuthState, signInWithGoogle, signOut } from "../utilities/firebase";

export default function Banner({ title }: { title: string }) {
  const { user, isAuthenticated, isInitialLoading } = useAuthState();

  return (
    <header className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-extrabold text-center w-full">{title}</h1>
      <div className="absolute right-4 top-4">
        {isInitialLoading ? null : isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="text-sm">Hi, {user?.displayName ?? "user"}</span>
            <button className="rounded border px-2 py-1" onClick={signOut}>Sign out</button>
          </div>
        ) : (
          <button className="rounded border px-2 py-1" onClick={signInWithGoogle}>Sign in</button>
        )}
      </div>
    </header>
  );
}
