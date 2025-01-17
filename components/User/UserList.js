import { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import Link from 'next/link';
import { RoleType } from '../../constants/ConstTypes';

class UserList extends Component {
  static propTypes = {
    isServer: PropTypes.bool.isRequired,
    fetchUserListData: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
  }
  constructor(props) {
    super(props);
    const { list } = props;
    this.state = {
      dataSource: list
    };

    this.columns = [{
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Link href={`/user/detail?username=${text}`} as={`/user/detail/${text}`}>
          <a>{text}</a>
        </Link>
      )
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <span>{RoleType[text]}</span>
    }];
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.list && nextProps.list !== prevState.dataSource) {
      return {
        dataSource: nextProps.list
      };
    }
    return null; 
  }

  render() {
    const { dataSource } = this.state;
    dataSource.map(item => {
      item.key = item.id;
      item.role = 10;
    });
    return (
      <Table
        style={{ minWidth: '600px' }}
        dataSource={dataSource}
        columns={this.columns}
        bordered
      />
    );
  }
}

export default UserList;
