import { FormEventHandler, useEffect } from "react";
import GuestLayout from "@/layouts/guest-layout";
import { useForm } from "@inertiajs/react";
import { Button, Checkbox, Form, Link, TextField } from "@/components/ui";

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            {status && (
                <div className="mb-4 font-medium text-sm text-success">
                    {status}
                </div>
            )}

            <Form
                validationErrors={errors}
                onSubmit={submit}
                className="space-y-4"
            >
                <TextField
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    autoFocus
                    isRequired
                    onChange={(e) => setData("email", e)}
                    errorMessage={errors.email}
                />

                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    autoComplete="current-password"
                    isRequired
                    onChange={(e) => setData("password", e)}
                    errorMessage={errors.password}
                />

                <div className="flex justify-between items-center">
                    <Checkbox
                        name="remember"
                        isSelected={data.remember}
                        onChange={(e) => setData("remember", e)}
                    >
                        Remember me
                    </Checkbox>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm text-muted-foreground hover:text-foreground focus:outline-none"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="flex justify-end gap-4 items-center">
                    {canRegister && (
                        <Link
                            href={route("register")}
                            className="text-sm text-muted-foreground hover:text-foreground focus:outline-none"
                        >
                            Register
                        </Link>
                    )}
                    <Button
                        type="submit"
                        className="ms-4"
                        isDisabled={processing}
                    >
                        Log in
                    </Button>
                </div>
            </Form>
        </>
    );
}

Login.layout = (page: any) => <GuestLayout title="Login" children={page} />;
