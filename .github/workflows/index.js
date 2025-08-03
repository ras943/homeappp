
app.get('/admin', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  const providers = await Provider.find().sort({ createdAt: -1 });

  let html = '<html><head><title>Fixo Admin</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"></head><body class="p-4">';
  html += '<h1>Fixo Admin Dashboard</h1><h2>Posted Jobs</h2><table class="table table-bordered"><thead><tr><th>Name</th><th>Phone</th><th>Service</th><th>Location</th><th>Time</th><th>Description</th></tr></thead><tbody>';

  jobs.forEach(job => {
    html += `<tr><td>${job.name}</td><td>${job.phone}</td><td>${job.service}</td><td>${job.location}</td><td>${job.time}</td><td>${job.description}</td></tr>`;
  });

  html += '</tbody></table><h2>Registered Providers</h2><table class="table table-bordered"><thead><tr><th>Name</th><th>CNIC</th><th>Phone</th><th>Service Type</th><th>Experience</th><th>Area</th></tr></thead><tbody>';

  providers.forEach(provider => {
    html += `<tr><td>${provider.name}</td><td>${provider.cnic}</td><td>${provider.phone}</td><td>${provider.serviceType}</td><td>${provider.experience}</td><td>${provider.area}</td></tr>`;
  });

  html += '</tbody></table></body></html>';
  res.send(html);
});
