import Activities from "@/entities/Activities";
import ActivityLocation from "@/entities/ActivityLocation";

interface ActivityWithCount extends Activities {
  participantCount: number;
}

interface LocationWithActivitiesData extends ActivityLocation {
  activities: ActivityWithCount[];
}

export default LocationWithActivitiesData;
