import { List } from "./list";
import { SearchPanel } from "./search-panel";

import { useState } from "react";
import { useDebounce, UseDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  //const [list, setList] = useState([]);
  // const [users, setUsers] = useState([]);
  // const client = useHttp();

  const debounceParam = useDebounce(param, 2000);
  const { isLoading, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers();

  UseDocumentTitle("项目列表");

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
