// ** Reactstrap Imports
import { Badge } from "reactstrap";

import Actions from "../components/Actions";

// ** Third Party Components
import moment from "moment";

export const columns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.name,
  },
  {
    name: "Created Date",
    sortable: true,
    minWidth: "150px",
    selector: (row) =>
      moment(row.created_date).format("YYYY-MM-DD") === "Invalid date"
        ? " "
        : moment(row.created_date).format("YYYY-MM-DD"),
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.status,
  },
  {
    name: "Actions",
    selector: (row) => row.category_id,
    cell: (row) => <Actions rowInfo={row} />,
  },
];
