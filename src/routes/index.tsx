import { clientOnly } from "@solidjs/start";

const Home = clientOnly(() => import('~/components/home'))

export default Home