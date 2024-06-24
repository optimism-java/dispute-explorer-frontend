import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import useGames from "../../hooks/useGames";
import { Table, TableProps } from "antd";
import { Game } from "../../lib/types";

const Dashboard = () => {

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const state = useGames()

  const columns: TableProps<Game>['columns'] = [
    {
      title: 'Index',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Game type',
      dataIndex: 'game_type',
      key: 'game_type'
    },
    {
      title: 'Address',
      dataIndex: 'game_contract',
      key: 'game_contract'
    },
    {
      title: 'L2 block',
      dataIndex: 'l_2_block_number',
      key: 'l_2_block_number',
    },
    {
      title: 'Age',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ]

  return (
    <div className="mx-auto mt-8 flex w-11/12 flex-col gap-8">
      <section className="flex flex-col items-center justify-center gap-12 sm:gap-20">
        <Search className="w-8/12" placeholder="input search text" onSearch={onSearch} enterButton />
      </section>
      <section></section>
      <section>
        {
          <Table columns={columns} dataSource={state.value} />
        }
      </section>
    </div>
    
  )
}

export default Dashboard