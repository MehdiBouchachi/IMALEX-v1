// components/OutcomeTable.jsx
import Table from "../../../ui/Table";
import { SERVICES_TABLE } from "../../../../app/_config/sections.config";

export default function OutcomeTable() {
  return (
    <Table columns="1.5fr 1fr 1fr">
      <Table.Header>
        <Table.Head label="Outcome">Outcome</Table.Head>
        <Table.Head label="DIY" className="text-center">
          DIY
        </Table.Head>
        <Table.Head label="IMALEX" className="text-center">
          IMALEX
        </Table.Head>
      </Table.Header>

      <Table.Body
        data={SERVICES_TABLE}
        render={(row) => (
          <Table.Row key={row.label}>
            <Table.Cell strong>{row.label}</Table.Cell>
            <Table.Cell align="center" muted>
              {row.diy}
            </Table.Cell>
            <Table.Cell align="center" brand>
              {row.imalex}
            </Table.Cell>
          </Table.Row>
        )}
        // optional: customize mobile per row (else it uses the default SimpleTwoStats)
        // mobileRender={(row) => (
        //   <Table.MobileCard key={row.label} title={row.label}>
        //     <Table.SimpleTwoStats
        //       leftLabel="DIY"
        //       leftValue={row.diy}
        //       rightLabel="IMALEX"
        //       rightValue={row.imalex}
        //     />
        //   </Table.MobileCard>
        // )}
      />
    </Table>
  );
}
