<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { supabase } from "$lib/supabase";
  import AppBar from "$lib/AppBar1.svelte";

  let users: any[] = [];
  let courses: any[] = [];

  let selectedUser = "";
  let selectedCourse = "";

  let searchUser = "";
  let loading = false;
  let showUsers = false;
 let selectedUserLabel = "";
  $: filteredUsers =
  !searchUser.trim()
    ? users
    : users.filter((user) =>
        `${user.name || ""} ${user.email || ""}`
          .toLowerCase()
          .includes(searchUser.toLowerCase())
      );
function selectUser(user: any) {
  selectedUser = user.uid;

  selectedUserLabel =
    `${user.name || ""} (${user.email || ""})`;

  searchUser = "";
  showUsers = false;
}

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest(".dropdown")) {
      showUsers = false;
    }
  }

  onMount(async () => {
    await loadData();

    document.addEventListener(
      "click",
      handleClickOutside
    );
  });

  onDestroy(() => {
    document.removeEventListener(
      "click",
      handleClickOutside
    );
  });

  async function loadData() {

    const { data: userData } =
      await supabase
        .from("users")
        .select("*")
        .order("name");

    const { data: courseData } =
      await supabase
        .from("courses")
        .select("*")
        .order("title");

    users = userData || [];
    courses = courseData || [];
  }

  async function assignCourse() {

    if (!selectedUser) {
      alert("Select Student");
      return;
    }

    if (!selectedCourse) {
      alert("Select Course");
      return;
    }

    loading = true;

    try {

      const { data: existing } =
        await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", selectedUser)
          .eq("course_id", selectedCourse)
          .maybeSingle();

      if (existing) {
        alert("Student already enrolled");
        loading = false;
        return;
      }

      const { error } =
        await supabase
          .from("enrollments")
          .insert({
            user_id: selectedUser,
            course_id: selectedCourse
          });

      if (error) throw error;

      alert("Course assigned successfully");

      selectedUser = "";
      selectedCourse = "";
      searchUser = "";

    } catch (err: any) {

      console.error(err);

      alert(err.message || "Failed");

    } finally {

      loading = false;
    }
  }
</script>
<AppBar title="Enroll Student" showBack={true} />

<div class="page">

  <h1>Assign Course Access</h1>

  <div class="card">

   <label>Search Student</label>

<div class="dropdown">

 <input
  class="search-box"
  placeholder="Search by name or email..."
  value={showUsers ? searchUser : selectedUserLabel}
  on:focus={() => {
    searchUser = "";
    showUsers = true;
  }}
  on:input={(e) => {
    searchUser =
      (e.currentTarget as HTMLInputElement).value;
  }}
/>

  {#if showUsers}
    <div class="user-list">

      {#if filteredUsers.length === 0}
        <div class="empty">
          No student found
        </div>
      {/if}

      {#each filteredUsers as user}
        <div
          class="user-item"
          on:click={() => selectUser(user)}
        >

          <div class="avatar">
            {(user.name || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div class="user-info">
            <div class="name">
              {user.name || "Unknown User"}
            </div>

            <div class="email">
              {user.email}
            </div>
          </div>

          {#if selectedUser === user.uid}
            <div class="tick">✓</div>
          {/if}

        </div>
      {/each}

    </div>
  {/if}

</div>
    <label class="mt">Course</label>

    <select bind:value={selectedCourse}>

      <option value="">
        Select Course
      </option>

      {#each courses as course}
        <option value={course.id}>
          {course.title}
        </option>
      {/each}

    </select>

    <button
      on:click={assignCourse}
      disabled={loading}
    >
      {loading
        ? "Assigning..."
        : "Grant Access"}
    </button>

  </div>

</div>

<style>

.page{
  padding:24px;
  max-width:900px;
  margin:auto;
}

h1{
  margin-bottom:20px;
  font-size:28px;
  font-weight:700;
}

.card{
  background:white;
  padding:24px;
  border-radius:18px;
  box-shadow:0 8px 30px rgba(0,0,0,.08);
}

label{
  display:block;
  margin-bottom:8px;
  font-weight:600;
}

.mt{
  margin-top:20px;
}

.search-box{
  width:100%;
  padding:14px;
  border:1px solid #ddd;
  border-radius:12px;
  font-size:14px;
}

.user-list{
  margin-top:12px;
  border:1px solid #e5e7eb;
  border-radius:14px;
  overflow:hidden;
  max-height:350px;
  overflow-y:auto;
}

.user-item{
  display:flex;
  align-items:center;
  gap:12px;
  padding:14px;
  cursor:pointer;
  transition:.2s;
  border-bottom:1px solid #f3f4f6;
}

.user-item:last-child{
  border-bottom:none;
}

.user-item:hover{
  background:#f8fafc;
}

.user-item.selected{
  background:#ecfdf5;
  border-left:4px solid #11ba66;
}

.avatar{
  width:44px;
  height:44px;
  border-radius:50%;
  background:linear-gradient(
    135deg,
    #20559b,
    #11ba66
  );

  color:white;

  display:flex;
  align-items:center;
  justify-content:center;

  font-weight:700;
  flex-shrink:0;
}

.user-info{
  flex:1;
}

.name{
  font-size:14px;
  font-weight:600;
}

.email{
  font-size:12px;
  color:#6b7280;
  margin-top:3px;
}

.tick{
  font-size:18px;
  color:#11ba66;
  font-weight:bold;
}

.empty{
  padding:20px;
  text-align:center;
  color:#999;
}

select{
  width:100%;
  padding:14px;
  border:1px solid #ddd;
  border-radius:12px;
  font-size:14px;
}

button{
  width:100%;
  margin-top:20px;
  padding:14px;
  border:none;
  border-radius:12px;
  background:linear-gradient(
    135deg,
    #20559b,
    #11ba66
  );
  color:white;
  font-size:15px;
  font-weight:700;
  cursor:pointer;
}

button:disabled{
  opacity:.7;
}

@media (max-width:768px){

  .page{
    padding:16px;
  }

  .card{
    padding:18px;
  }

}



.dropdown{
  position:relative;
}

.user-list{
  position:absolute;
  top:100%;
  left:0;
  right:0;

  background:white;

  border:1px solid #e5e7eb;
  border-radius:14px;

  margin-top:6px;

  max-height:320px;
  overflow-y:auto;

  z-index:999;

  box-shadow:0 12px 30px rgba(0,0,0,.12);
}

</style>