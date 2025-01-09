
import { motion } from 'framer-motion'
import { LogOut, Edit3, X, FileText, LinkIcon, ExternalLink, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from '../components/UserProfilePageComponents/Button'
import { Tab, Tabs } from '../components/UserProfilePageComponents/tabs'
import { Card, Progress } from '../components/ui-components'
import { CardContent, CardFooter, CardHeader } from '../components/UserProfilePageComponents/Card'

const user = {
  name: "Jane Doe",
  username: "jane_doe",
  role: "Mentor",
  profilePicture: "https://userpic.codeforces.org/3513869/title/e48cb51df07af7a.jpg"
}

const workspaces = [
  { id: 1, name: "Web Development 101", description: "Learn the basics of web development", memberCount: 25, type: "Public" },
  { id: 2, name: "Advanced JavaScript", description: "Deep dive into JavaScript concepts", memberCount: 15, type: "Private" }
]

const savedWorkspaces = [
  { id: 3, name: "UX Design Principles", mentor: "John Smith" },
  { id: 4, name: "Mobile App Development", mentor: "Alice Johnson" }
]

const savedResources = [
  { id: 1, name: "JavaScript Basics", type: "PDF", workspace: "Web Development 101" },
  { id: 2, name: "React Documentation", type: "Link", workspace: "Advanced JavaScript" }
]

const scheduledMeetings = [
  { id: 1, name: "Web Dev Q&A", date: "2023-05-15", time: "14:00", status: "Upcoming" },
  { id: 2, name: "JavaScript Workshop", date: "2023-05-16", time: "10:00", status: "Ongoing" }
]

const activityData = [
  { name: 'Workspaces', value: 5 },
  { name: 'Meetings', value: 10 },
  { name: 'Resources', value: 15 },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function UserProfilePage() {
  return (
    <motion.div 
      className="container mx-auto px-4 py-8 h-screen w-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header 
        className="flex flex-col md:flex-row items-center justify-between mb-8"
        {...fadeInUp}
      >
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            <img
              src={user.profilePicture}
              alt={user.name}
              className="rounded-full aspect-square w-24"
            />
            <motion.button 
              className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit3 size={16} />
            </motion.button>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">@{user.username}</p>
            <span className="inline-block bg-indigo-600 text-white text-sm px-2 py-1 rounded-full mt-1">
              {user.role}
            </span>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
          <Button variant="destructive">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </motion.header>

      <Tabs className="space-y-4">
        <Tab label="Workspaces">
          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {workspaces.map((workspace) => (
              <motion.div key={workspace.id} variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-800">{workspace.name}</h3>
                    <p className="text-gray-600">{workspace.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">Members: {workspace.memberCount}</p>
                    <p className="text-gray-700">Type: {workspace.type}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Edit Workspace</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Tab>
        <Tab label="Saved Workspaces">
          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {savedWorkspaces.map((workspace) => (
              <motion.div key={workspace.id} variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-800">{workspace.name}</h3>
                    <p className="text-gray-600">Mentor: {workspace.mentor}</p>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="destructive">
                      <X className="mr-2 h-4 w-4" /> Remove from Saved
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Tab>
        <Tab label="Saved Resources">
          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {savedResources.map((resource) => (
              <motion.div key={resource.id} variants={fadeInUp}>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      {resource.type === 'PDF' ? (
                        <FileText className="mr-2 h-4 w-4 text-indigo-600" />
                      ) : (
                        <LinkIcon className="mr-2 h-4 w-4 text-indigo-600" />
                      )}
                      {resource.name}
                    </h3>
                    <p className="text-gray-600">{resource.workspace}</p>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {resource.type === 'PDF' ? 'Download' : 'Open'}
                    </Button>
                    <Button variant="destructive">
                      <X className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Tab>
        <Tab label="Scheduled Meetings">
          <motion.div 
            className="space-y-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {scheduledMeetings.map((meeting) => (
              <motion.div key={meeting.id} variants={fadeInUp}>
                <Card className={meeting.status === 'Ongoing' ? 'border-indigo-600 border-2' : ''}>
                  <CardHeader>
                    <h3 className="text-lg font-semibold text-gray-800">{meeting.name}</h3>
                    <p className="text-gray-600">
                      <Clock className="inline-block mr-2 h-4 w-4 text-indigo-600" />
                      {meeting.date} at {meeting.time}
                    </p>
                  </CardHeader>
                  <CardFooter>
                    <Button variant={meeting.status === 'Ongoing' ? 'default' : 'outline'}>
                      {meeting.status === 'Ongoing' ? 'Join Meeting' : 'View Details'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Tab>
        <Tab label="Activity Analytics">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">Activity Overview</h3>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#4f46e5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 space-y-4">
                  {activityData.map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-gray-700">{item.value}</span>
                      </div>
                      <Progress value={(item.value / Math.max(...activityData.map(d => d.value))) * 100} label={""}/>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Tab>
      </Tabs>
    </motion.div>
  )
}

