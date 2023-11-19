import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.SUPABASE_URL!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const deleteUser = async (email: string) => {
  const result = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', email.toLocaleLowerCase());

  if (result.error) {
    throw new Error(result.error.message);
  }

  if (!result.data || result.data.length === 0) {
    throw new Error(`User not found: ${email}`);
  }

  const user = result.data[0];
  await supabaseAdmin.auth.admin.deleteUser(user.id);
  const deleteResult = await supabaseAdmin
    .from('users')
    .delete()
    .eq('id', user.id);

  if (deleteResult.error) {
    throw new Error(deleteResult.error.message);
  }
};
