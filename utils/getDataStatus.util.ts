import { DataStatus } from '../enums/DataStatusEnum';

const getDataStatus = (dataStatus: DataStatus) => {
  return {
    IDLE: dataStatus === DataStatus.IDLE,
    LOADING: dataStatus === DataStatus.LOADING,
    SUCCESSFUL: dataStatus === DataStatus.SUCCESSFUL,
    FAILED: dataStatus === DataStatus.FAILED,
  };
};

export default getDataStatus;
