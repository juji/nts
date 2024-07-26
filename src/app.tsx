import { MetaProvider, Title, Link, Meta } from "@solidjs/meta";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import '@juji/preflight/min.css'
import "./app.css";

// import Layout from '~/components/layout'
import { clientOnly } from "@solidjs/start";
const Layout = clientOnly(() => import('~/components/layout'))

export default function App() {

  return (
    <MetaProvider>
    <Title>Nts.</Title>
    <Meta name="description" content="A simple note editor" />
    <Router root={props => <Layout children={props.children} />}>
      <FileRoutes />
    </Router>
    </MetaProvider>
  );
}
