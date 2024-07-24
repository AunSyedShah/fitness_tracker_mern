import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const WorkoutForm = ({ initialValues, onSubmit }) => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        category: Yup.string().required('Category is required'),
        exercises: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Exercise name is required'),
                sets: Yup.number().required('Sets are required').positive().integer(),
                reps: Yup.number().required('Reps are required').positive().integer(),
                weight: Yup.number().required('Weight is required').positive(),
                notes: Yup.string()
            })
        ).required('At least one exercise is required'),
        tags: Yup.array().of(Yup.string())
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Workout Name</label>
                        <Field type="text" name="name" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <Field type="text" name="category" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                    </div>
                    <FieldArray name="exercises">
                        {({ push, remove }) => (
                            <>
                                {values.exercises.map((exercise, index) => (
                                    <div key={index} className="border p-2 rounded-md">
                                        <div>
                                            <label htmlFor={`exercises.${index}.name`} className="block text-sm font-medium text-gray-700">Exercise Name</label>
                                            <Field type="text" name={`exercises.${index}.name`} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                            <ErrorMessage name={`exercises.${index}.name`} component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor={`exercises.${index}.sets`} className="block text-sm font-medium text-gray-700">Sets</label>
                                            <Field type="number" name={`exercises.${index}.sets`} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                            <ErrorMessage name={`exercises.${index}.sets`} component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor={`exercises.${index}.reps`} className="block text-sm font-medium text-gray-700">Reps</label>
                                            <Field type="number" name={`exercises.${index}.reps`} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                            <ErrorMessage name={`exercises.${index}.reps`} component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor={`exercises.${index}.weight`} className="block text-sm font-medium text-gray-700">Weight</label>
                                            <Field type="number" name={`exercises.${index}.weight`} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                            <ErrorMessage name={`exercises.${index}.weight`} component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor={`exercises.${index}.notes`} className="block text-sm font-medium text-gray-700">Notes</label>
                                            <Field type="text" name={`exercises.${index}.notes`} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                            <ErrorMessage name={`exercises.${index}.notes`} component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <button type="button" onClick={() => remove(index)} className="mt-2 bg-red-500 text-white p-1 rounded-md">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => push({ name: '', sets: '', reps: '', weight: '', notes: '' })} className="mt-2 bg-green-500 text-white p-1 rounded-md">Add Exercise</button>
                            </>
                        )}
                    </FieldArray>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <FieldArray name="tags">
                            {({ push, remove }) => (
                                <>
                                    {values.tags.map((tag, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Field type="text" name={`tags.${index}`} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                                            <button type="button" onClick={() => remove(index)} className="ml-2 bg-red-500 text-white p-1 rounded-md">Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push('')} className="mt-2 bg-green-500 text-white p-1 rounded-md">Add Tag</button>
                                </>
                            )}
                        </FieldArray>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="mt-4 bg-blue-500 text-white p-2 rounded-md">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </Form>
            )}
        </Formik>
    );
};

export default WorkoutForm;
