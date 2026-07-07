// ===============================
// Global
// ===============================

let modal;

// ===============================
// Saat Dashboard Dibuka
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  if (!getToken()) {
    window.location.href = "index.html";

    return;
  }

  modal = new bootstrap.Modal(document.getElementById("studentModal"));

  loadStudents();
});

// ===============================
// Ambil Semua Data
// ===============================

async function loadStudents() {
  try {
    const response = await fetch(
      `${BASE_URL}/students`,

      {
        headers: authHeader(),
      },
    );

    const result = await response.json();

    const tbody = document.getElementById("studentTable");

    tbody.innerHTML = "";

    document.getElementById("totalStudent").innerText = result.data.length;

    result.data.forEach((student) => {
      tbody.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.nama}</td>

                <td>${student.nim}</td>

                <td>${student.prodi}</td>

                <td>${student.semester}</td>

                <td>

                    <button

                        class="btn btn-warning btn-sm action-btn"

                        onclick="editStudent(${student.id})">

                        Edit

                    </button>

                    <button

                        class="btn btn-danger btn-sm"

                        onclick="deleteStudent(${student.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;
    });
  } catch (error) {
    console.log(error);
  }
}

// ===============================
// Reset Form
// ===============================

function resetForm() {
  document.getElementById("studentId").value = "";

  document.getElementById("nama").value = "";

  document.getElementById("nim").value = "";

  document.getElementById("prodi").value = "";

  document.getElementById("semester").value = "";
}

// ===============================
// Simpan Data
// ===============================

async function saveStudent() {
  const id = document.getElementById("studentId").value;

  const data = {
    nama: document.getElementById("nama").value,

    nim: document.getElementById("nim").value,

    prodi: document.getElementById("prodi").value,

    semester: document.getElementById("semester").value,
  };

  let url = `${BASE_URL}/students`;

  let method = "POST";

  if (id) {
    url = `${BASE_URL}/students/${id}`;

    method = "PUT";
  }

  const response = await fetch(
    url,

    {
      method,

      headers: authHeader(),

      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  alert(result.message);

  modal.hide();

  resetForm();

  loadStudents();
}

// ===============================
// Edit
// ===============================

async function editStudent(id) {
  const response = await fetch(
    `${BASE_URL}/students/${id}`,

    {
      headers: authHeader(),
    },
  );

  const result = await response.json();

  const student = result.data;

  document.getElementById("studentId").value = student.id;

  document.getElementById("nama").value = student.nama;

  document.getElementById("nim").value = student.nim;

  document.getElementById("prodi").value = student.prodi;

  document.getElementById("semester").value = student.semester;

  modal.show();
}

// ===============================
// Delete
// ===============================

async function deleteStudent(id) {
  if (!confirm("Yakin ingin menghapus data?")) {
    return;
  }

  const response = await fetch(
    `${BASE_URL}/students/${id}`,

    {
      method: "DELETE",

      headers: authHeader(),
    },
  );

  const result = await response.json();

  alert(result.message);

  loadStudents();
}
