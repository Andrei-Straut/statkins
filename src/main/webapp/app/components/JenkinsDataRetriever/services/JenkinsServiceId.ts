

export const JenkinsServiceId = {
  Nodes: 'Nodes' as 'Nodes',
  ViewList: 'ViewList' as 'ViewList',
  Views: 'Views' as 'Views',
  UserList: 'UserList' as 'UserList',
  Users: 'Users' as 'Users',
  JobList: 'JobList' as 'JobList',
  Jobs: 'Jobs' as 'Jobs',
  BuildList: 'BuildList' as 'BuildList',
  Builds: 'Builds' as 'Builds',
  Changesets: 'Changesets' as 'Changesets'
}
export type JenkinsServiceId = (typeof JenkinsServiceId)[keyof typeof JenkinsServiceId];