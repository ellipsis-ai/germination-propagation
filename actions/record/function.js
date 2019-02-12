function(trialId, treatmentId, chamberPosition, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const moment = require('moment-timezone');

const now = moment().tz(ellipsis.team.timeZone);
const reminderTime = now.add(1, 'day');
const reminderTimeString = `tomorrow at ${reminderTime.format("hh:mm:ss a")}`;
const format = "YYYY-MM-DD hh:mm:ss a";
const output = `
:seedling: A new germination has been recorded by ${ellipsis.event.user.formattedLink}

**Trial ID:** \`${trialId}\`
**Treatment ID:** \`${treatmentId}\`
**Germination chamber position:** \`${chamberPosition}\`
**When:** \`${now.format(format)}\`
**Reminder:** \`${reminderTimeString}\`
`;

api.schedule({
  actionName: 'remind',
  recurrence: `tomorrow at ${reminderTimeString}`,
  channel: ellipsis.env.GERMINATION_PROPAGATION_NOTIFICATION_CHANNEL
}).then(() => api.say({
  message: output,
  channel: ellipsis.env.GERMINATION_PROPAGATION_NOTIFICATION_CHANNEL
})).then(ellipsis.noResponse);
}
