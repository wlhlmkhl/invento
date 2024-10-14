export function sayHello(string) {
  console.log(`Hello ${string}!`);
}

// Validates incoming JSON data
export async function validateJSONData(req) {
  let body;
  try {
    body = await req.json(); // Parse incoming data to JSON
    return [false, body]; // No errors, return parsed body
  } catch (error) {
    return [true, null]; // Error occurred, return null body
  }
}

// Validates user data for registration/login
export function validateUserData(data) {
  let errors = {};

  // Check if name is provided
  if (!data.name || typeof data.name !== "string") {
    errors.name = "Name is required";
  }

  // Check if password is provided and valid
  if (
    !data.password ||
    typeof data.password !== "string" ||
    data.password.length < 8
  ) {
    errors.password = "Invalid password format";
  }

  // Check if email is provided and valid
  if (data.email && typeof data.email !== "string") {
    errors.email = "Invalid email format";
  }

  const hasErrors = Object.keys(errors).length > 0; // Check for any errors
  return [hasErrors, errors]; // Return error status and errors
}

// Validates item data for a general item
export function validateItemData(data) {
  let errors = {};

  // Check if name is provided
  if (!data.name || typeof data.name !== "string") {
    errors.name = "Name is required";
  }

  // Check if description is provided
  if (!data.description || typeof data.description !== "string") {
    errors.description = "Description is required";
  }

  // Check if quantity is a non-negative number (allow 0)
  if (
    data.quantity === null ||
    data.quantity === undefined ||
    typeof data.quantity !== "number" ||
    data.quantity < 0
  ) {
    errors.quantity = "Quantity is required and must be a non-negative number";
  }

  // Check if category is a valid string
  if (data.category && typeof data.category !== "string") {
    errors.category = "Invalid category";
  }

  const hasErrors = Object.keys(errors).length > 0; // Check for any errors
  return [hasErrors, errors]; // Return error status and errors
}

// Function to send a not found response
export function notFoundResponse(response, message = "Resource not found") {
  return response.json({ message }, { status: 404 });
}
