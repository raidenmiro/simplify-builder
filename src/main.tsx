import { render } from "preact";

import { Application } from "./app/application";

render(<Application />, document.querySelector("#app") as HTMLElement);
