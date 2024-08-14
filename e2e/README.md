# e2e

1. `npx playwright test` Runs the end-to-end tests.

2. `npx playwright test <spec-file-path-1> <spec-file-path-1>` Runs the specified test file alone

3. `npx playwright test -g <"title-of-the-specific-test">` runs test with the title

4. `npx playwright test --ui` Starts the interactive UI mode.
5. `npx playwright test --project=chromium` Runs the tests only on Desktop Chrome.

6. `npx playwright test example` Runs the tests in a specific file. (i.e finds the spec file which has this name and runs the file)

7. `npx playwright test --debug` Runs the tests in debug mode.

8. `npx playwright test <spec-file-path-1> --debug` Debugs specific file

9. `npx playwright test <spec-file-path-1:<line-number>> --debug` Lets you debug from a specific line number

10. `npx playwright test --workers <no-of-workers` Runs the tests with specified number of workers in parallel

11. `npx playwright codegen` Auto generate tests with Codegen.
12. `npx playwright test --project=chromium --headed` runs in headed

# recipe to delete all the test users

```elixir
alias Userflow.Accounts.User
alias Userflow.Accounts.Company

Repo.transaction(fn ->
  # Find the ids of users we want to delete
  user_ids_query = from u in User,
    where: like(u.email, "%test-company%"),
    select: u.id

  user_ids = Repo.all(user_ids_query)

  # Delete companies created by these users
  company_query = from c in Company,
    where: c.creator_id in ^user_ids or like(c.name, "%test-company%")
  {deleted_companies_count, _} = Repo.delete_all(company_query)

  # Now delete the users
  user_query = from u in User, where: u.id in ^user_ids
  {deleted_users_count, _} = Repo.delete_all(user_query)

  IO.puts "Deleted #{deleted_companies_count} companies and #{deleted_users_count} users"
end)
```

# recipe to delete all the test flows

```Elixir
   alias Userflow.Flows.Flow
   query = from f in Flow, where: f.name == "test-flow"
    Repo.delete_all(query)
```
