// ** Reactstrap Imports
import { Badge } from "reactstrap";

import Actions from "../components/Actions";

// ** Third Party Components
import moment from "moment";

export const columns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "25%",
    selector: (row) => row.name,
  },
  {
    name: "Created Date",
    sortable: true,
    minWidth: "25%",
    selector: (row) =>
      moment(row.created_date).format("YYYY-MM-DD") === "Invalid date"
        ? " "
        : moment(row.created_date).format("YYYY-MM-DD"),
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "25%",
    selector: (row) => row.status,
    cell: (row) => (
      <div>
        {row.status === 1 ? (
          <Badge color='light-success' pill>
            Active
          </Badge>
        ) : (
          <Badge color='light-warning' pill>
            Inactive
          </Badge>
        )}
      </div>
    ),
  },
  {
    name: "Actions",
    selector: (row) => row.category_id,
    cell: (row) => <Actions rowInfo={row} />,
  },
];
