
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";

import '@juji/preflight/min.css'
import "./app.css";

import { clientOnly } from "@solidjs/start";
const Layout = clientOnly(() => import('~/components/layout'))

export default function App() {

  return (
    <Router root={props => <Layout children={props.children} />}>
      <FileRoutes />
    </Router>
  );
}
