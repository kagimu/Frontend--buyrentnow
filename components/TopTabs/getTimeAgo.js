import moment from "moment";

export function getTimeAgo(creationDate) {
  const now = moment();
  const postDate = moment(creationDate);
  const duration = moment.duration(now.diff(postDate));

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())}s ago`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}m ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h ago`;
  } else {
    return `${Math.floor(duration.asDays())}d ago`;
  }
}
