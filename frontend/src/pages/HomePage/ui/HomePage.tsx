import { Button } from "shared/ui/Button"
import { useTheme } from "shared/ui/ThemeProvider"
import { useUnit } from "effector-react"
import { router } from "shared/routing"
import { Link } from "atomic-router-react"
import { $session, $user } from "shared/api"
import { logouted } from "shared/session/logouted"

export const HomePage = () => {
  const { theme, setTheme } = useTheme()

  const {
    logout,
    user,
    session,
  } = useUnit({
    logout: logouted,
    user: $user,
    session: $session,
  })

  return (
    <div className="home-page" style={{
      maxWidth: "64rem",
      margin: "0 auto",
    }}>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>toggle ({theme})</Button>

      <Button onClick={logout}>logout</Button>

      <nav style={{
        display: "flex",
        gap: "1rem",
      }}>
        {router.routes.map(value => <Link key={value.path} to={value.route}>{value.path}</Link>)}
      </nav>

      <div className="">
        <h1>User:</h1>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>

        <h1>session:</h1>
        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
}
