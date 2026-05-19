<script>
  let email = "";
  let message = "";
  let success = false;

  function submitRequest() {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    success = true;
  }
</script>

<svelte:head>
  <title>Delete Account - Construction Wizards</title>
</svelte:head>

<div class="wrapper">
  <div class="card">

    <img src="/logo.png" alt="logo" class="logo" />

    <h1>Delete Account Request</h1>

    <p class="desc">
      Request deletion of your Construction Wizards account and associated data.
    </p>

    {#if !success}

      <input
        type="email"
        bind:value={email}
        placeholder="Enter registered email"
      />

      <textarea
        bind:value={message}
        placeholder="Reason (optional)"
      ></textarea>

      <button on:click={submitRequest}>
        Request Account Deletion
      </button>

    {:else}

      <div class="success">
        Your deletion request has been submitted.
        <br /><br />
        Our support team will process your request within 7 business days.
      </div>

    {/if}

    <div class="info">
      Support:
      <a href="mailto:support@constructionwizards.app">
        support@constructionwizards.app
      </a>
    </div>

  </div>
</div>

<style>
  .wrapper{
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
    background:linear-gradient(135deg,#20559b,#11ba66,#1e3c72);
    font-family:Arial,sans-serif;
  }

  .card{
    width:100%;
    max-width:420px;
    background:white;
    border-radius:24px;
    padding:32px 24px;
    box-shadow:0 10px 30px rgba(0,0,0,.15);
    text-align:center;
  }

  .logo{
    width:90px;
    margin-bottom:16px;
  }

  h1{
    margin:0 0 10px;
    color:#111;
    font-size:28px;
  }

  .desc{
    color:#666;
    font-size:14px;
    margin-bottom:24px;
  }

  input,
  textarea{
    width:100%;
    padding:14px;
    margin-bottom:14px;
    border-radius:14px;
    border:1px solid #ddd;
    font-size:15px;
    outline:none;
    box-sizing:border-box;
  }

  textarea{
    min-height:110px;
    resize:none;
  }

  button{
    width:100%;
    padding:14px;
    border:none;
    border-radius:14px;
    background:#11ba66;
    color:white;
    font-size:16px;
    font-weight:600;
    cursor:pointer;
  }

  button:hover{
    opacity:.92;
  }

  .success{
    background:#e8fff2;
    color:#0a7f43;
    padding:18px;
    border-radius:16px;
    font-size:15px;
    margin-top:10px;
  }

  .info{
    margin-top:22px;
    font-size:14px;
    color:#555;
  }

  .info a{
    color:#11ba66;
    text-decoration:none;
    font-weight:600;
  }
</style>