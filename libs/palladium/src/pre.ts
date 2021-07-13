import type { method } from "./general";
import type Pd from "./palladium";

export default function(plug: Pd): Record<string, method> {
    return {
        auth: async(ctx) => {
            console.log(ctx.body, plug.$config.host);

            throw "AUTH ERR";
        }
    };
}