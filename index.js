const express = require('express')
const bodyParser = require('body-parser')
const mail = require('./services/mail')
const db = require('./services/firebase')
const nexmo = require('./services/nexmo')
const app = express()

app.use(bodyParser.json())

app.get('/hosts', getHosts)
app.post('/checkin', createCheckin)
app.listen(3000, () => console.log("Listening on port 3000"))

// var hostRef = db.collection('hosts').doc()
// hostRef.set({ name: "Persona 1" })
// hostRef.set({ name: "Persona 2" })
// hostRef.set({ name: "Persona 3" })
// hostRef.set({ name: "Persona 4" })

async function getHosts(req, res) {
  try {
    const hostRef = db.collection('hosts')
    const query = await hostRef.get()
    const hosts = query.docs.map(h => ({ ...h.data(), id: h.id }))
    console.log('Document data:', hosts);
    res.json(hosts)
  } catch (err) {
    console.log('Error getting hosts', err);
      res.status(422).json({ error: { message: err.message } })
  }
}

async function createCheckin(req, res) {
  const { email, name, phone, host } = req.body
  
  try {
    // Save
    var visitorRef = db.collection('visitors').doc()
    await visitorRef.set({ email, name, phone, host: db.doc('hosts/' + host) })

    // Response
    var doc = await visitorRef.get()
    if (!doc.exists) {
      console.log('No such document!');
      res.status(422).json({ error: { message: 'No such document' }})
    } else {
      const visitorData = doc.data()

      // SMS
      const hostDoc = await visitorData.host.get()
      const hostData = hostDoc.data()
      // await nexmo.sendNotification(hostData.phone, name)

      res.json({ ...visitorData, host: hostData })
    }
  } catch(err) {
    console.log('Error getting document', err);
    res.status(422).json({ error: { message: err.message } })
  }
}
