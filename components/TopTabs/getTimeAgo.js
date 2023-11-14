import moment from "moment";

export function getTimeAgo(creationDate) {
  const now = moment();
  const postDate = moment(creationDate);
  const duration = moment.duration(now.diff(postDate));

  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())} seconds ago`;
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} hours ago`;
  } else {
    return `${Math.floor(duration.asDays())} days ago`;
  }
}
