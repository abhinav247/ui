import {SELECT_COMPETENCIES,SELECT_QUESTIONS} from './actionTypes';
import {uniqueId} from 'lodash';

export const groups = [
  {
    id: 1,
    title: "Group 1"
  },
  {
    id: 2,
    title: "Group 2"
  },
  {
    id: 3,
    title: "Group 3"
  },
  {
    id: 4,
    title: "Group 4"
  }
];


const createCompetencies = (noofTimes, group_id,competencies) => {
  let competenciesLength = competencies.length;
  for (
    let index = competencies.length;
    index < competenciesLength + noofTimes;
    index++
  ) {
    competencies.push({
      id: index,
      groupId: groups[group_id - 1].id,
      title: `competency ${index}`
    });
  }
};

export const getCompetencies = () => {

  let competencies=[]
  createCompetencies(20, 1,competencies);
  createCompetencies(5, 2,competencies);
  createCompetencies(5, 3,competencies);
  return competencies;
};



const createQuestioners = (noofTimes, com_id, group_id,questioners) => {
  let questlenth = questioners.length;
  for (
    let index = questioners.length;
    index < noofTimes + questlenth;
    index++
  ) {
    questioners.push({
      id: index,
      compentency_id: com_id,
      groupId: group_id,
      title: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type`
    });
  }
};

export const getQuestioners = () => {
  let questioners=[]
  createQuestioners(6, 1, 1,questioners);
  createQuestioners(8, 2, 1,questioners);
  createQuestioners(4, 3, 2,questioners);
  createQuestioners(6, 4, 2,questioners);
  createQuestioners(8, 5, 3,questioners);
  createQuestioners(6, 6, 3,questioners);
  createQuestioners(12, 7, 4,questioners);
  createQuestioners(10, 8, 4,questioners);

  return questioners;
};



export const selectCompentencies= compId=>{ return {type:SELECT_COMPETENCIES,compId}}


export const selectQuestiones= questions=>{ return {type:SELECT_QUESTIONS,questions}}