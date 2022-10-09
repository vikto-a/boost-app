# New Features

## Search User Feature

1. [ ] Add username to prisma User schema

2. [ ] Search component
	- Implement component using [HeadlessUI Autocomplete](https://headlessui.com/react/combobox)
	- Styles should roughly match [figma design](https://www.figma.com/file/A3EdTv3wOwOANZObjk82iq/Murph-Search-User-Feature?node-id=0%3A1)
	- Search users enpoint onChange
	- Selecting user should push to `/users/:id`
	- Place component in navbar and / or `/users` page

3. [ ] Search users endpoint
	- Take string as input
	- Regex search users with username that matches input
	- Returns array of users that match input

4. [ ] Create `/users/:id` page
	- Should roughly resemble [Profile page](https://murph.bioboost.fit/me)