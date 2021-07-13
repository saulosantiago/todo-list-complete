import styled from 'styled-components';

const ButtonAddTask = styled.button`
  width: 80px;
`;

const TaskInputName = styled.input`
  display: block;
  margin-right: 25px;
`;

const ProjectName = styled.div`
  margin-right: auto;
`;

const ProjectOptions = styled.div`
  width: 60px;
  justfy-content: center;
`;

const ButtonOption = styled.a`
  margin: 5px;
`;

const CheckTask = styled.input`
  margin-left: 5px;
`;

const LabelTask = styled.a`
  text-decoration: none;
  margin-left: 10px;
`;

const TaskGroup = styled.label`
  margin: 5px 0;
  font-size: 20px;
  font-weight: 500;
`;

export {
  ButtonAddTask,
  TaskInputName,
  ProjectName,
  ProjectOptions,
  ButtonOption,
  CheckTask, 
  LabelTask,
  TaskGroup
}