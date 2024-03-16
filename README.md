# E-Court System

git workflow:

1. before begin to work on a feature create a branch for it:
   `git branch <branch-name>`
   branch name convention: `bugfix/<...>` or `feat/<...>`
2. add and commit to your branch frequently, whenever you have something that works add and commit. DON't wait until you finish all of the work on the branch.
   `git status` `git add .` `git add <file1> <file2>` `git commit -m "<commit-msg>"` `git push <remote> <branch-name>`
   you can sets the upstream of the local branch so that it tracks that branch on the origin repo, by typing this: `git push -u origin <branch-name>`
3. on frequent basis, move to main pull from remote, back to your branch then merge, and resolve conflicts if there are, so that your branch stays in sync with the main.
4. when you finish working the branch, that is you complete building the feature, open a pull request on the github, DO NOT push directly to the main
5. if you did the above we will not - I hope - face merge conflicts when we merge the branches into the main.

example:
I want to work on register form on the frontend:

1. first the remote repo must be cloned to my local drive
   `git clone git@github.com:MuazAbdin/E-Court-System.git`
2. make sure you are on the main branch: `git switch main`
3. make a new branch and switch to it: `git switch -c feat/registerForm`
4. work on building the form, add, commit, push, frequently.
5. on frequent basis, and when finish working on the feature:
   switch to main: `git switch main` ,
   pull from remote: `git pull orgin main`,
   switch back to my branch: `git switch feat/registerForm`
   merge with main and resolve conflicts: `git merge main`
6. push to remote branch `git push orgin feat/registerForm`
7. go to hithub and open pull request.



## API Routes

### Authentication Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Register | /auth/register/ | POST | password, passwordConfirm, IDcard, firstName, lastName, userType, email, mobile, city, street, licenseNumber | firstName, lastName, userType |
| Login | /auth/login/ | POST | IDcard, password | firstName, lastName, userType |
| Logout | /auth/logout/ | POST | | |
| Log in with google | /auth/google | POST | credential, client_id | 
JWT-HTTP-Only-Cookie is set after a successful Register or Login

### Case Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Case | /cases/ | POST | title, description, status, court, judge, parties: [ { lawyer, client: { idNumber, firstName, lastName, email, phoneNumber } } ] | _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt |
| File a Case | /cases/file-a-case | POST | title, description, court, parties: [ { lawyer, client: { idNumber, firstName, lastName, email, phoneNumber } } ]
| Get All Cases | /cases/?query | GET | | [ [ _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt ] ] |
| Get User Cases | /cases/user | GET | | [ _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt ] |
| Get Pending Cases | /cases/pending | GET | | [ _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt ] |
| Get Case | /cases/:id | GET | | _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt
| Update Case | /cases/ | PATCH | caseId, title, description, status, court, judge | _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt |
| Update Case Status | /cases/status/ | PATCH | _id, status | _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt |
| Resolve/Review Pending Case | /cases/resolve-pending | PATCH | caseId, status, judge | _id, status, title, description, court, judge, events, parties, caseNumber, createdAt, updatedAt |

### Court Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Court | /courts/ | POST | courtName, city, street, mobile, email, judges? | _id, name, city, street, phoneNumber, judges, email |
| Get Court | /court/:id | GET | | _id, name, city, street, phoneNumber, judges, email |
| Update Court | /court/ | Patch | id, name, phoneNumber, email | _id, name, city, street, phoneNumber, judges, email

### Document Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Document | /documents/ | POST | caseId, title, uploadedBy, documentFile | _id, caseId, title, uploadedBy |
| Get Document | /documents/:id | GET | | Document |
| Get User Documents | /documents/user/:id | GET | | Document |
| Get Party Documents | /documents/party/:id | GET | | Document |
| Get Case Documents | /documents/case/:id | GET | | Document |
| Update Document Title | /documents/ | PATCH | id, title | Document |

### Event Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Event | /events/ | POST | caseId, eventType, date, description | Event |
| Get Case Events | /events/case/:id | GET | | [ Event ] |
| Get Event | /events/:id | GET | | Event |
| Update Event | /events/ | PATCH | eventId, date, description | Event |
| Delete Event | /events/ | DELETE | eventId | |

### Party Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Party | /parties/ | POST | partyName, lawyer?, caseId, [ StakeholderData ] | Party |
| Get Case Parties | /parties/case/:id | GET | | [ Party ] |
| Get Party | /parties/:id | GET | | Party |
| Update Party | /parties/ | PATCH | partyId, partyName, lawyer | Party |
| Delete Party | /parties/ | DELETE | partyId | |

### Stakeholder Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Stakeholder | /stakeholders/ | POST | StakeholderData | Stakeholder |
| Get Stakeholders By Party | /stakeholders/party/:id | GET |  | [ Stakeholder ] |
| Get Stakeholders | /stakeholders/:id | GET |  | Stakeholder |
| Update Stakeholder | /stakeholders/ | PUT | Stakeholder | Stakeholder |
| Delete Stakeholder | /stakeholder/ | DELETE | stakeholderId | |

### User Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Get Judges | /users/judges | GET | | [ User ] |
| Get Lawyers | /users/lawyers | GET | | [ User ] |
| Get All Users | /users/ | GET | | [ User ] |
| Update User(Admin) | /users/ | PUT | User | User |
| Update User | /users/ | PATCH | phoneNumber, city, street | User |
