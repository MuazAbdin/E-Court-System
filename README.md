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
