function(trialId, treatmentId, chamberPosition, ellipsis) {
  const EllipsisApi = require('ellipsis-api');
const api = new EllipsisApi(ellipsis);
const moment = require('moment-timezone');

const now = moment().tz(ellipsis.team.timeZone);
const reminderTime = now.add(1, 'day');
const reminderTimeString = `tomorrow at ${reminderTime.format("hh:mm:ss a")}`;
const format = "YYYY-MM-DD hh:mm:ss a";
const channel = ellipsis.env.GERMINATION_PROPAGATION_NOTIFICATION_CHANNEL; 
const output = `
:seedling: A new germination has been recorded by ${ellipsis.event.user.formattedLink}

**Trial ID:** \`${trialId}\`
**Treatment ID:** \`${treatmentId}\`
**Germination chamber position:** \`${chamberPosition}\`
**When:** \`${now.format(format)}\`
**Reminder:** \`${reminderTimeString}\` in <#${channel}>
`;

api.schedule({
  actionName: 'remind',
  recurrence: `tomorrow at ${reminderTimeString}`,
  channel: channel
}).then(() => api.say({
  message: output,
  channel: channel
})).then(() => ellipsis.success(channel));
}
