import {activityService} from "@/services/activity.service";
import {IPayload} from "@/types/jwt";

const activityController = {
  getALlActivity: async ({store}: { store: { user: IPayload } }) => activityService.getALlActivity(store.user),
}

export default activityController;