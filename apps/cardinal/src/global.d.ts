import type $Atom from "../../atom/core/atom";
import type { $Pd } from "../../atom/libs/palladium";
import type { ServiceRes as $ServiceRes, Service as $Service } from "../../atom/libs/palladium";

declare global {
  type Atom = $Atom;
  type Pd = $Pd;
  type ServiceRes = $ServiceRes;
  type Service = $Service;
}